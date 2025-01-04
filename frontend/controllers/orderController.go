package controllers

import (
	"context"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/pablomedina7/pengushop/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type OrderController struct {
	OrderCollection   *mongo.Collection
	ProductCollection *mongo.Collection
}

// Crear una nueva orden
func (oc *OrderController) CreateOrder(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Error al procesar el formulario", http.StatusBadRequest)
		return
	}

	customerName := r.FormValue("customerName")
	city := r.FormValue("city")
	phone := r.FormValue("phone")
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
		Phone:        phone,
		Items: []models.OrderItem{
			{
				ProductID: productID,
				Quantity:  quantity,
			},
		},
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()),
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = oc.OrderCollection.InsertOne(ctx, order)
	if err != nil {
		log.Println("Error al insertar la orden:", err)
		http.Error(w, "Error al crear la orden", http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, "/", http.StatusSeeOther)
}
