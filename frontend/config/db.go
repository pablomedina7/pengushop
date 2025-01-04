// config/db.go
package config

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectDB se conecta a MongoDB usando la URI que le pases, y devuelve el *mongo.Client.
func ConnectDB(uri string) *mongo.Client {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("Error al conectar a MongoDB: %v", err)
	}
	return client
}
