class TodosController < ApplicationController
  def create
    list = find_list
    todo = create_todo_with_position(list)

    if todo.save
      insert_todo_at_position(todo, list)
      render json: todo
    else
      render json: todo.errors.full_messages
    end
  end

  def update
    todo = find_todo
    list = find_list

    insert_todo_at_position(todo, list)

    render json: todo, status: :ok
  end

  private

  def find_list
    List.find(params[:list_id])
  end

  def create_todo_with_position(list)
    last_position = list.todos.order(:position).last&.position || 0
    Todo.new(todo_params.merge(position: last_position))
  end

  def insert_todo_at_position(todo, list)
    todos_in_list = list.todos.order(:position)

    if todos_in_list.blank?
      todo.update(position: 0, list: list)
    elsif todo.position > todos_in_list.last.position
      todo.update(position: todos_in_list.last.position + 1, list: list)
    else
      shift_positions_for_todos_after(todo, todos_in_list)
      todo.update(list: list)
    end
  end

  def shift_positions_for_todos_after(todo, todos_to_update)
    todos_to_update.where('position >= ?', todo.position).each do |t|
      t.update(position: t.position + 1)
    end
  end

  def find_todo
    Todo.find(params[:id])
  end

  def todo_params
    params.permit(:name, :list_id)
  end
end
