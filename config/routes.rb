Rails.application.routes.draw do
  # get 'hello_world', to: 'hello_world#index'

  resources :users do
    resources :habits do
      member do
        post '/complete', to: 'habits#complete'
        delete '/uncomplete', to: 'habits#uncomplete'
      end
    end

  end

  resources :sessions, only: [:create]
  get '/sessions', to: 'sessions#authenticate'
  delete '/sessions', to: 'sessions#destroy'

  root 'statics#index'

  get '*foo', to: 'statics#index'
end
