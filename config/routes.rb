Rails.application.routes.draw do

  # devise_for :users

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    resources :available_vacancies
    resources :comments
    resources :companies
    resources :curriculums
    resources :educations
    resources :projects
    resources :requirements
    resources :skills
    resources :social_links
    resources :users
    resources :work_experiences
  end
end
