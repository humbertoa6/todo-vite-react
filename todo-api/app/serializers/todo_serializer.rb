class TodoSerializer < ActiveModel::Serializer
  attributes :id, :name, :position, :list_id
end
