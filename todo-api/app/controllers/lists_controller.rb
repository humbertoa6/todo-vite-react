class ListsController < ApplicationController
  def index
    render json: List.all, each_serializer: ListSerializer
  end

  def create
    list = List.new(list_params)
    if list.save
      render json: list, status: :created
    else
      render json: { errors: list.errors.full_messages }
    end

  end

  def destroy
    list = List.find(params[:id])
    if list
      list.destroy
      head :no_content
    else
      render json: { errors: 'List was not found' }, status: :not_found
    end
  end

  private

  def list_params
    params.permit(:name)
  end
end
