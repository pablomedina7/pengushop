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
	orderCollection   *mongo.Collection
	productCollection *mongo.Collection
}

// NewOrderController construye el controlador para pedidos
func NewOrderController(orderCol, productCol *mongo.Collection) *OrderController {
	return &OrderController{
		orderCollection:   orderCol,
		productCollection: productCol,
	}
}

// CreateOrder maneja la creación de una orden via formulario (POST /order).
func (oc *OrderController) CreateOrder(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
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

	_, err = oc.orderCollection.InsertOne(ctx, order)
	if err != nil {
		log.Println("Error al insertar la orden:", err)
		http.Error(w, "Error al crear la orden", http.StatusInternalServerError)
		return
	}

	// Redirige de nuevo a la página principal
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
