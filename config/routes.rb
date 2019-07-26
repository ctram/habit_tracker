Rails.application.routes.draw do
  # get 'hello_world', to: 'hello_world#index'

  resources :users, only: [:create] do
    resources :habits do
      member do
        post '/update_habit_completed_for_date', to: 'habits#update_habit_completed_for_date'
      end
    end
  end

  resources :sessions, only: [:create]
  get '/sessions', to: 'sessions#authenticate'
  delete '/sessions', to: 'sessions#destroy'

  root 'statics#index'

  get '/sign-in', to: 'statics#sign_in'

  get '*foo', to: 'statics#index'
end
