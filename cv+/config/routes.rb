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

  post '/api/companies/:company_id/add_user/:user_id', to: 'api/companies#add_user_to_company', as: :add_user_to_company




  namespace :api do
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

    resources :available_vacancies do
      resources :requirements
    end
  end
end
