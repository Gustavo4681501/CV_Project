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
    resources :companies
    resources :curriculums
    resources :educations
    resources :projects
    resources :requirements
    resources :skills
    resources :social_links
    resources :work_experiences

    resources :users do
      resources :comments
    end

    resources :available_vacancies do
      resources :requirements

      member do
        post :apply
        delete :unapply
        get :check_application
      end
    end
  end
end
