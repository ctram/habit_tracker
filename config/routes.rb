Rails.application.routes.draw do
  # get 'hello_world', to: 'hello_world#index'

  resources :users
  resources :sessions, only: [:create, :show, :destroy]

  root 'statics#index'

  get '*foo', to: 'statics#index'
end
