Rails.application.routes.draw do
  # Devise routes for users
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Devise routes for companies
  devise_for :companies, path: 'companies', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'companies/sessions',
    registrations: 'companies/registrations'
  }

  # API routes within the 'api' namespace
  namespace :api do
    # Custom route to fetch all avatars for users
    get '/users/all_avatar', to: 'users#all_avatar'

    # Resource routes for various API endpoints
    resources :curriculums
    resources :educations
    resources :projects
    resources :requirements
    resources :skills
    resources :social_links
    resources :work_experiences

    # Nested routes for companies
    resources :companies do
      member do
        get :avatar
        delete :destroy_avatar
      end
    end

    # Nested routes for users and their comments
    resources :users do
      resources :comments
      member do
        get :avatar
        delete :destroy_avatar
      end
    end
    resources :comments, only:[:destroy]
    # Nested routes for available vacancies
    resources :available_vacancies do
      resources :requirements
      member do
        post :apply
        delete :unapply
        get :check_application
        get :show_applicants
      end
    end
  end
end
