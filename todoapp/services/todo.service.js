var ToDo = require('../models/todo.model')

_this = this
exports.getTodos = async function(query, page, limit) {
  var options = {
    page,
    limit
  }

  try {
    var todos = await ToDo.find()
    return todos;
  } catch(e) {
    throw Error('Error while Paginating Todos')
  }
}

exports.createTodo = async function(todo) {
  var newTodo = new ToDo({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status
  })

  try {
    var savedTodo = await newTodo.save()
    return savedTodo;
  } catch(e) {
    throw Error("Error while Creating Todo")
  }
}

exports.updateTodo = async function(todo) {
  var id = todo.id

  try {
    var oldTodo = await ToDo.findById(id)
  } catch(e) {
    throw Error("Error occured while finding the Todo")
  }

  if (!oldTodo) {
    return false;
  }

  console.log(oldTodo)

  oldTodo.title = todo.title
  oldTodo.description = todo.description
  oldTodo.status = todo.status

  console.log(oldTodo)

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo
  } catch(e) {
    throw Error("And Error occured while updating the Todo")
  }
}

exports.deleteTodo = async function(id) {
  try {
    var deleted = await ToDo.deleteOne({_id: id})
    if(deleted.n === 0) { 
      throw Error("Todo could not be deleted")
    }
    return deleted
  } catch(e) {
    throw Error("Error occured while deleting the Todo")
  }
}