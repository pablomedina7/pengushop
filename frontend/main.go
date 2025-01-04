package main

import (
	"context"
	"log"
	"net/http"

	"github.com/pablomedina7/pengushop/config"
	"github.com/pablomedina7/pengushop/controllers"
)

func main() {
	client := config.ConnectDB()                  // Conectar a MongoDB
	defer client.Disconnect(context.Background()) // Desconectar al salir

	productController := controllers.NewProductController(client) // Inicializar el controlador
	http.HandleFunc("/", productController.RenderIndex)           // Manejar la vista de productos
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./public"))))

	log.Println("Servidor corriendo en http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
