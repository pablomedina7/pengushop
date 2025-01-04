package main

import (
	"log"
	"net/http"

	"github.com/pablomedina7/pengushop/config"
	"github.com/pablomedina7/pengushop/controllers"
)

func main() {
	// Conecta a Mongo pasando la URI en crudo o desde tu .env como prefieras.
	client := config.ConnectDB("mongodb://localhost:27017")
	defer client.Disconnect(nil) // desconectar al cerrar

	// Ejemplo: Inicializar tus controladores
	productCol := client.Database("pengushop").Collection("products")
	orderCol := client.Database("pengushop").Collection("orders")

	productController := controllers.NewProductController(productCol)
	orderController := controllers.NewOrderController(orderCol, productCol)

	// Rutas
	http.HandleFunc("/", productController.RenderIndex)
	http.HandleFunc("/order", orderController.CreateOrder)

	log.Println("Servidor corriendo en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
