// controllers/orderController.go
package controllers

import (
	"context"
	"html/template"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/pablomedina7/pengushop/frontend/models" // Ajusta a tu módulo real

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type OrderController struct {
	OrderCollection   *mongo.Collection
	ProductCollection *mongo.Collection
	Tmpl              *template.Template
}

func (oc *OrderController) CreateOrder(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		// Render del formulario
		oc.Tmpl.ExecuteTemplate(w, "orderForm.tmpl", nil)
	case http.MethodPost:
		// Procesar el formulario
		err := r.ParseForm()
		if err != nil {
			http.Error(w, "No se pudo procesar el formulario", http.StatusBadRequest)
			return
		}

		customerName := r.FormValue("customerName")
		city := r.FormValue("city")
		productIDStr := r.FormValue("productID")
		quantityStr := r.FormValue("quantity")

		quantity, err := strconv.Atoi(quantityStr)
		if err != nil {
			http.Error(w, "Cantidad inválida", http.StatusBadRequest)
			return
		}

		productID, err := primitive.ObjectIDFromHex(productIDStr)
		if err != nil {
			http.Error(w, "ID de producto inválido", http.StatusBadRequest)
			return
		}

		order := models.Order{
			CustomerName: customerName,
			City:         city,
			Items: []models.OrderItem{
				{
					ProductID: productID,
					Quantity:  quantity,
				},
			},
		}

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		_, err = oc.OrderCollection.InsertOne(ctx, order)
		if err != nil {
			log.Println(err)
			http.Error(w, "Error al crear pedido", http.StatusInternalServerError)
			return
		}

		// Redirigir a la página principal (lista de productos)
		http.Redirect(w, r, "/", http.StatusSeeOther)
	default:
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
	}
}
