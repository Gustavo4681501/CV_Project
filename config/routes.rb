Rails.application.routes.draw do


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


  namespace :api do
    resources :curriculums
    resources :educations
    resources :projects
    resources :requirements
    resources :skills
    resources :social_links
    resources :work_experiences

    resources :companies do
      member do
        get :avatar
        delete :destroy_avatar
      end
    end

    # collection do
    #   get :all_avatar
    # end

    get '/users/all_avatar', to: 'users#all_avatar'

    resources :users do
      resources :comments
      member do
        get :avatar
        delete :destroy_avatar
      end
    end

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
