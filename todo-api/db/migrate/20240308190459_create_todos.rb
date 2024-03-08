class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.integer :position
      t.references :list, foreign_key: true

      t.timestamps
    end
  end
end
