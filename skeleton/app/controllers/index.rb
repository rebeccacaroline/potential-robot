require 'httparty'

get '/' do
  erb :index
end

get '/sessions/new' do
  # render sign-in page
  erb :sign_in
end

post '/sessions' do
  @user = User.where(email: params[:email]).first
  if @user.password == params[:password]
    session[:id] = @user.id
  else
    @error
  end
  redirect '/'
end

delete '/sessions/:id' do
  session.clear
  redirect '/'
end

#----------- USERS -----------

get '/users/new' do
  erb :sign_up
end

post '/users' do
  @user = User.create(params[:user])
  if @user.save
    session[:id] = @user.id
  end
  redirect '/'
end


