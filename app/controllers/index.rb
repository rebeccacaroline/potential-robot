get '/' do
  erb :index
end

get '/sessions/new' do
  @user = User.find(session[:id])
  zip = @user.zip_code
  response = HTTParty.get("https://api.wunderground.com/api/59fc6ecd129fa3cb/geolookup/conditions/q/#{zip}.json")
  @location = response.parsed_response["location"]["city"]
  @temp = response.parsed_response["current_observation"]["temp_f"].to_i
  @weather = response.parsed_response["current_observation"]["weather"].downcase
  p response.parsed_response
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


