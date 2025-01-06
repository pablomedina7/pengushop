package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OrderItem struct {
	ProductID   primitive.ObjectID `bson:"productID"`
	ProductName string             `bson:"productName"` // <-- Nuevo campo
	Quantity    int                `bson:"quantity"`
}
type Order struct {
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	CustomerName string             `bson:"customerName"`
	City         string             `bson:"city"`
	Phone        string             `bson:"phone"`
	Items        []OrderItem        `bson:"items"`
	CreatedAt    primitive.DateTime `bson:"createdAt"`
}
