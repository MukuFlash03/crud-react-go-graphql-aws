package graph

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

import (
	"github.com/MukuFlash03/task-manager/graph/model"
)

type Resolver struct{
	tasks []*model.Task
}

func NewResolver() *Resolver {
    return &Resolver{
        tasks: make([]*model.Task, 0),
    }
}