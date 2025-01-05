package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/pablomedina7/pengushop/config"
	"github.com/pablomedina7/pengushop/controllers"
)

func main() {
	// Crear un contexto con timeout para la conexión y desconexión
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Conecta a Mongo pasando la URI en crudo o desde tu .env como prefieras.
	client := config.ConnectDB("mongodb://localhost:27017")
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Printf("Error al desconectar de MongoDB: %v", err)
		}
	}()

	// Inicializar tus controladores
	productCol := client.Database("pengushop").Collection("products")
	orderCol := client.Database("pengushop").Collection("orders")

	productController := controllers.NewProductController(productCol)
	orderController := controllers.NewOrderController(orderCol, productCol)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./public"))))

	// Rutas
	http.HandleFunc("/", productController.RenderIndex)
	http.HandleFunc("/order", orderController.CreateOrder)

	log.Println("Servidor corriendo en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
