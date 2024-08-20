package postgres

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/MukuFlash03/task-manager/pkg/utils"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	_ "github.com/lib/pq"
)

var (
	host     = os.Getenv("DB_HOST")
	port     = os.Getenv("DB_PORT")
	user     = os.Getenv("DB_USER")
	password = os.Getenv("DB_PASSWORD")
	dbname   = os.Getenv("DB_NAME")
)

var PG_DB_URL = fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require", user, password, host, port, dbname)

var Db *sql.DB

func InitDB() {
	psqlconn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=require", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlconn)
	utils.CheckError(err, "panic")

	err = db.Ping()
	utils.CheckError(err, "panic")

	Db = db
	fmt.Println("Connected!")
}

func CloseDB() error {
	return Db.Close()
}

func Migrate() {
	d, err := iofs.New(migrations, "migrations")
	if err != nil {
		log.Fatalf("couldn't create iofs driver: %v", err)
	}

	driver, err := postgres.WithInstance(Db, &postgres.Config{})
	if err != nil {
		log.Fatalf("couldn't create the postgres driver: %v", err)
	}

	m, err := migrate.NewWithInstance("iofs", d, "postgres", driver)
	if err != nil {
		log.Fatalf("migrate.NewWithInstance failed: %v", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalf("An error occurred while syncing the database: %v", err)
	}

	log.Println("Migrations completed successfully")
}