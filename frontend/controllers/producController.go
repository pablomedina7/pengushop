package controllers

import (
	"html/template"
	"log"
	"net/http"

	"github.com/pablomedina7/pengushop/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProductController struct {
	productCollection *mongo.Collection
}

func NewProductController(productCol *mongo.Collection) *ProductController {
	return &ProductController{productCollection: productCol}
}

// ProductView define cómo se representan los productos en la vista
type ProductView struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Image       string  `json:"image"`
}

func (pc *ProductController) RenderIndex(w http.ResponseWriter, r *http.Request) {
	// 1. Obtener productos desde la base de datos
	ctx := r.Context()
	cursor, err := pc.productCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Println("Error al obtener productos:", err)
		http.Error(w, "Error al obtener productos", http.StatusInternalServerError)
		return // Detener ejecución
	}
	defer cursor.Close(ctx)

	var products []ProductView
	for cursor.Next(ctx) {
		var product models.Product
		if err := cursor.Decode(&product); err != nil {
			log.Println("Error al decodificar producto:", err)
			continue
		}
		products = append(products, ProductView{
			ID:          product.ID.Hex(),
			Name:        product.Name,
			Description: product.Description,
			Price:       product.Price,
			Image:       product.Image,
		})
	}

	// Verificar si hubo errores al iterar sobre los documentos
	if err := cursor.Err(); err != nil {
		log.Println("Error durante la iteración de productos:", err)
		http.Error(w, "Error al procesar productos", http.StatusInternalServerError)
		return // Detener ejecución
	}

	// 2. Cargar y renderizar la plantilla HTML
	tmpl, err := template.ParseFiles("./templates/index.html")
	if err != nil {
		log.Println("Error al cargar plantilla:", err)
		http.Error(w, "Error al cargar plantilla", http.StatusInternalServerError)
		return // Detener ejecución
	}

	data := struct {
		Products []ProductView
	}{
		Products: products,
	}

	err = tmpl.Execute(w, data)
	if err != nil {
		log.Println("Error al renderizar plantilla:", err)
		http.Error(w, "Error al renderizar plantilla", http.StatusInternalServerError)
		return // Detener ejecución
	}
}
