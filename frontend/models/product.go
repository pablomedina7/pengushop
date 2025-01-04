package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Representa un producto
type Product struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Name        string             `bson:"name"`
	Description string             `bson:"description"`
	Price       float64            `bson:"price"`
	ImageURL    string             `bson:"image_url"`
}
