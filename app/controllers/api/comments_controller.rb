class Api::CommentsController < ApplicationController
    before_action :set_comment, only: [:show, :update, :destroy]
    before_action :set_resource, only: [:index, :create]

    def index
        comments = @user.comments.includes(:user, :company)
        render json: comments, include: {
            user: {only: [:id, :name]},
            company: {only: [:id, :name]}
        }
    end

    def show
        render json: @comment, include: :user
    end

    def create
        if params[:user_id]
            @user = User.find(params[:user_id])
            @comment = @user.comments.build(comment_params)
        elsif params[:company_id]
            @company = Company.find(params[:company_id])
            @comment = @company.comments.build(comment_params)
        else
            render json: { error: "No user_id or company_id provided" }, status: :unprocessable_entity
            return
        end

        if @comment.save
            render json: @comment, status: :created
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    def update
        if @comment.update(comment_params)
            render json: @comment
        else
            render json: @comment.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @comment.destroy
    end

    private

    def set_comment
        @comment = Comment.find(params[:id])
    end

    def set_resource
        if params[:user_id]
            @user = User.find(params[:user_id])
        elsif params[:company_id]
            @company = Company.find(params[:company_id])
        else
            render json: { error: "No user_id or company_id provided" }, status: :unprocessable_entity
        end
    end

    def comment_params
        params.require(:comment).permit(:body, :date, :user_id, :company_id)
    end
end
