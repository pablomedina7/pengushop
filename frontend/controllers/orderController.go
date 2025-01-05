package controllers

import (
	"context"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/pablomedina7/pengushop/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type OrderController struct {
	orderCollection   *mongo.Collection
	productCollection *mongo.Collection
}

func NewOrderController(orderCol, productCol *mongo.Collection) *OrderController {
	return &OrderController{
		orderCollection:   orderCol,
		productCollection: productCol,
	}
}

// Crear pedido
func (oc *OrderController) CreateOrder(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error al procesar el formulario", http.StatusBadRequest)
		return
	}

	// Extraer valores del formulario
	customerName := r.FormValue("customerName")
	city := r.FormValue("city")
	phone := r.FormValue("phone")
	productIDStr := r.FormValue("productID")
	quantityStr := r.FormValue("quantity")

	// Convertir cantidad a entero
	quantity, err := strconv.Atoi(quantityStr)
	if err != nil || quantity <= 0 {
		http.Error(w, "Cantidad inválida", http.StatusBadRequest)
		return
	}

	// Convertir productID a ObjectID
	productID, err := primitive.ObjectIDFromHex(productIDStr)
	if err != nil {
		http.Error(w, "ID de producto inválido", http.StatusBadRequest)
		return
	}

	// Verificar si el producto existe
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	product := models.Product{}
	err = oc.productCollection.FindOne(ctx, bson.M{"_id": productID}).Decode(&product)
	if err != nil {
		http.Error(w, "Producto no encontrado", http.StatusNotFound)
		return
	}

	// Crear el pedido
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
		CreatedAt: primitive.NewDateTimeFromTime(time.Now()), // Conversión correcta
	}

	_, err = oc.orderCollection.InsertOne(ctx, order)
	if err != nil {
		log.Println("Error al insertar la orden:", err)
		http.Error(w, "Error al crear la orden", http.StatusInternalServerError)
		return
	}

	// Respuesta exitosa
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
