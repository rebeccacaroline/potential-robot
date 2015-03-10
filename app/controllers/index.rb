get '/' do
  erb :index
end

get '/sessions/new' do
  erb :sign_in
end

post '/sessions' do
  content_type :json
  @user = User.where(email: params[:email]).first
  if @user.password == params[:password]
    session[:id] = @user.id
    {id: @user.id}.to_json
  else
    @error
  end
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
end


