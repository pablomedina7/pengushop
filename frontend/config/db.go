package config

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectDB se conecta a MongoDB usando la URI proporcionada y devuelve un *mongo.Client.
func ConnectDB(uri string) *mongo.Client {
	// Crear un contexto con timeout para la conexión
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("Error al conectar a MongoDB: %v", err)
	}

	// Verificar la conexión
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatalf("Error al verificar conexión con MongoDB: %v", err)
	}

	log.Println("Conectado a MongoDB correctamente")
	return client
}
