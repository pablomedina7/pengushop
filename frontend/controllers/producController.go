package controllers

import (
	"context"
	"html/template"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProductController struct {
	productCollection *mongo.Collection
	tmpl              *template.Template
}

func NewProductController(client *mongo.Client) *ProductController {
	return &ProductController{
		productCollection: client.Database("pengushop").Collection("products"),
		tmpl:              template.Must(template.ParseFiles("views/index.html")),
	}
}

func (pc *ProductController) RenderIndex(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := pc.productCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Println("Error al buscar productos:", err)
		http.Error(w, "No se pudieron obtener productos", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var products []map[string]interface{}
	if err = cursor.All(ctx, &products); err != nil {
		log.Println("Error al decodificar productos:", err)
		http.Error(w, "Error al decodificar productos", http.StatusInternalServerError)
		return
	}

	data := map[string]interface{}{
		"Products": products,
	}

	if err := pc.tmpl.Execute(w, data); err != nil {
		log.Println("Error al renderizar plantilla:", err)
		http.Error(w, "Error al renderizar", http.StatusInternalServerError)
	}
}
