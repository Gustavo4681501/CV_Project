Rails.application.routes.draw do
  get 'private/test'


  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_for :companies, path: 'companies', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'companies/sessions',
    registrations: 'companies/registrations'
  }

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
    resources :users
    resources :requirements
    resources :skills
    resources :social_links
    resources :work_experiences
  end
end
