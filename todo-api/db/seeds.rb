# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


4.times do |n|
  list = List.create!(name: "List #{n}")

  4.times do |n2|
    Todo.create!(name: "Task #{n}-#{n2}", list_id: list.id, position: n2 + 1)
  end
end
