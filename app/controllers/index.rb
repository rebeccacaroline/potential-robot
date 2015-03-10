get '/' do
  erb :index
end

get '/sessions/new' do
  @user = User.find(session[:id])
  erb :landing_page
end

post '/sessions' do
  @user = User.where(email: params[:email]).first
  if @user.password == params[:password]
    session[:id] = @user.id
  else
    @error
  end
  redirect '/sessions/new'
end



delete '/sessions' do
  session.clear
   # redirect '/'
end


post '/users' do
  content_type :json
  @user = User.new(params[:user])
  if @user.save
    session[:id] = @user.id
    {id: @user.id}.to_json
  end
  erb :new_user_page
end


