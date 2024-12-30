package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client // <--- Declaro aquí UNA sola vez

func ConnectDB() *mongo.Client {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		uri = "mongodb://localhost:27017/myshop"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	c, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	// Verificamos la conexión
	err = c.Ping(ctx, nil)
	if err != nil {
		log.Fatal("No se pudo conectar a MongoDB en Go", err)
	}

	fmt.Println("Conectado a MongoDB desde Go!")
	client = c
	return client
}

func GetCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	return client.Database("myshop").Collection(collectionName)
}
