Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'

  resources :users

  post '/sessions', to: 'sessions#create'
  get '/sessions', to: 'sessions#show'

  root 'statics#index'

  get '*foo', to: 'statics#index'
  # post /.*/, to: 'statics#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
