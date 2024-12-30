// models/order.go
package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type OrderItem struct {
	ProductID primitive.ObjectID `bson:"productId,omitempty"`
	Quantity  int                `bson:"quantity,omitempty"`
}

type Order struct {
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	CustomerName string             `bson:"customerName,omitempty"`
	City         string             `bson:"city,omitempty"`
	Items        []OrderItem        `bson:"items,omitempty"`
}
