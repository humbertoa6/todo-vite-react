class ListSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :todos, serializer: TodoSerializer
end
