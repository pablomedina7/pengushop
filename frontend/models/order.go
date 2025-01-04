package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Representa un pedido
type Order struct {
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	CustomerName string             `bson:"customer_name"`
	City         string             `bson:"city"`
	Phone        string             `bson:"phone"`
	Items        []OrderItem        `bson:"items"`
	CreatedAt    primitive.DateTime `bson:"created_at"`
}

type OrderItem struct {
	ProductID primitive.ObjectID `bson:"product_id"`
	Quantity  int                `bson:"quantity"`
}
