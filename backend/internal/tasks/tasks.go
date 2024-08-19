package tasks

import (
	database "github.com/MukuFlash03/task-manager/internal/pkg/db/postgres"
	"log"
	"database/sql"

	"github.com/MukuFlash03/task-manager/pkg/utils"
)

type Task struct {
	ID      string
	Title   string
	Completed bool
}

func (task Task) Save() int64 {
	log.Print("Attempting to save new task...")

	stmt, err := database.Db.Prepare("INSERT INTO Tasks(Title) VALUES($1) RETURNING id")
	utils.CheckError(err, "fatal")
	
	defer stmt.Close()

	var insertedID int64
	err = stmt.QueryRow(task.Title).Scan(&insertedID)
	utils.CheckError(err, "fatal")
	
	log.Print("Row inserted successfully!")
	return insertedID
}

func GetAll() []Task {
	log.Print("Attempting to fetch tasks...")

	stmt, err := database.Db.Prepare("SELECT id, title, completed FROM Tasks")
	utils.CheckError(err, "fatal")
	defer stmt.Close()

	rows, err := stmt.Query()
	utils.CheckError(err, "fatal")
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var task Task
		err := rows.Scan(&task.ID, &task.Title, &task.Completed)
		utils.CheckError(err, "fatal")
		tasks = append(tasks, task)
	}

	err = rows.Err();
	utils.CheckError(err, "fatal")

	log.Print("Rows fetched successfully!")
	return tasks
}

func GetTaskIdByTitle(title string) (Task, error) {
	log.Print("Attempting to fetch existing task...")

	stmt, err := database.Db.Prepare("SELECT ID, Title, Completed FROM Users WHERE Title LIKE '%' || $1 || '%'")	
	utils.CheckError(err, "fatal")
	
	row := stmt.QueryRow(title)

	var task Task
	err = row.Scan(&task.ID, &task.Title, &task.Completed)
	if err != nil {
		if err != sql.ErrNoRows {
			log.Print(err)
		}
		return Task{}, err
	}

	utils.CheckError(err, "fatal")

	return task, nil
}