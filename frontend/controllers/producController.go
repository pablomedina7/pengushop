// controllers/productController.go
package controllers

import (
	"context"
	"html/template"
	"log"
	"net/http"
	"time"

	"github.com/pablomedina7/pengushop/frontend/models" // Ajusta a tu módulo real
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ProductController struct {
	ProductCollection *mongo.Collection
	Tmpl              *template.Template
}

func (pc *ProductController) ListProducts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := pc.ProductCollection.Find(ctx, bson.M{}, options.Find())
	if err != nil {
		log.Println(err)
		http.Error(w, "Error al obtener productos", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var products []models.Product
	if err = cursor.All(ctx, &products); err != nil {
		log.Println(err)
		http.Error(w, "Error al decodificar productos", http.StatusInternalServerError)
		return
	}

	// Renderizamos la plantilla productList.tmpl
	pc.Tmpl.ExecuteTemplate(w, "productList.tmpl", products)
}
