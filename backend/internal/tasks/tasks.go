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

func (task Task) Update() bool {
    log.Printf("Attempting to update task with ID %s...", task.ID)

    stmt, err := database.Db.Prepare("UPDATE Tasks SET completed = NOT completed WHERE id = $1 RETURNING completed")
    utils.CheckError(err, "fatal")
    defer stmt.Close()

    var newCompletedStatus bool
    err = stmt.QueryRow(task.ID).Scan(&newCompletedStatus)
    if err == sql.ErrNoRows {
        log.Printf("No task found with ID %s", task.ID)
        return false
    }
    utils.CheckError(err, "fatal")

    task.Completed = newCompletedStatus
    log.Printf("Task with ID %s updated successfully! New completed status: %v", task.ID, task.Completed)
    return true
}

func (task Task) Delete() bool {
	log.Printf("Attempting to delete task with ID %s...", task.ID)

	stmt, err := database.Db.Prepare("DELETE FROM Tasks WHERE id = $1")
	utils.CheckError(err, "fatal")
	defer stmt.Close()

	result, err := stmt.Exec(task.ID)
	utils.CheckError(err, "fatal")

	rowsAffected, err := result.RowsAffected()
	utils.CheckError(err, "fatal")

	if rowsAffected == 0 {
		log.Printf("No task found with ID %s", task.ID)
		return false
	}

	log.Printf("Task with ID %s deleted successfully!", task.ID)
	return true
}

func GetTaskById(id string) (Task, error) {
	log.Print("Attempting to delete existing task...")

	stmt, err := database.Db.Prepare("SELECT ID, Title, Completed FROM Users WHERE ID = $1")	
	utils.CheckError(err, "fatal")
	
	row := stmt.QueryRow(id)

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