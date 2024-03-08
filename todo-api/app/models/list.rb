class List < ApplicationRecord
  has_many :todos, -> { order(position: :asc, updated_at: :desc) }, dependent: :destroy
end
