var TodoService = require('../services/todo.service')

_this = this

exports.getTodos = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10

  try {
    var todos = await TodoService.getTodos({}, page, limit)

    return generateResponseWithData(res, 200, todos, "Succesfully received Todos")
  } catch(e) {
    return generateResponse(res, 400, e.message)
  }
}

exports.createTodos = async function (req, res, next) {
  var todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  }

  try {
    var createdTodo = await TodoService.createTodo(todo)
    return generateResponseWithData(res, 201, createdTodo, "Successfully created Todo")
  } catch(e) {
    return generateResponse(res, 400, "Unsuccessfully created Todo")
  }
}

exports.updateTodo = async function (req, res, next) {
  if (!req.body._id) {
    return generateResponse(res, 400, "Id must be present")
  }

  var id = req.body._id
  
  console.log(req.body)

  var todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  }

  try {
    var updateTodo = await TodoService.updateTodo(todo)
    return generateResponseWithData(res, 200, updateTodo, "Successfully updated Todo")
  } catch(e) {
    return generateResponse(res, 400, e.message)
  }
}

exports.removeTodo = async function(req, res, next) {
  var id = req.params.id
  
  try {
    var deleted = await TodoService.deleteTodo(id)
    return generateResponse(res, 200, "Successfully deleted Todo")
  } catch(e) {
    return generateResponse(res, 400, e.message)
  }
}

function generateResponseWithData(res, statusNumber, data, message) {
  return res.status(statusNumber).json({
    status: statusNumber,
    data: data,
    message: message
  })
}

function generateResponse(res, statusNumber, message) {
  return res.status(statusNumber).json({
    status: statusNumber,
    message: message
  })
}