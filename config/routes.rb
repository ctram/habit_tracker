Rails.application.routes.draw do
  resources :users
  
  root 'statics#index'

  get '*foo', to: 'statics#index'
  # post /.*/, to: 'statics#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
