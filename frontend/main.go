package main

import (
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"github.com/pablomedina7/pengushop/frontend/controllers"
)

// NO declaro var client *mongo.Client aquí, ya está en db.go

func main() {
	// 1. Carga .env
	err := godotenv.Load()
	if err != nil {
		log.Println("No se encontró .env, se usarán valores por defecto.")
	}

	// 2. Conecta a Mongo
	//    Esto asigna a la variable client declarada en db.go
	ConnectDB()

	// 3. Colecciones
	productCol := GetCollection(client, "products")
	orderCol := GetCollection(client, "orders")

	// 4. Plantillas
	tmpl := template.Must(template.ParseGlob("views/*.tmpl"))

	// 5. Controladores
	pc := &controllers.ProductController{
		ProductCollection: productCol,
		Tmpl:              tmpl,
	}
	oc := &controllers.OrderController{
		OrderCollection:   orderCol,
		ProductCollection: productCol,
		Tmpl:              tmpl,
	}

	// 6. Rutas
	http.HandleFunc("/", pc.ListProducts)
	http.HandleFunc("/order", oc.CreateOrder)

	// 7. Arranque
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Tienda Go corriendo en http://localhost:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
