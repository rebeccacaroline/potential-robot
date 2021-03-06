get '/' do
  erb :index
end

get '/sessions/new' do
  @user = User.find(session[:id])
  zip = @user.zip_code
  response = HTTParty.get("https://api.wunderground.com/api/#{ENV['SECRET_KEY']}/geolookup/conditions/q/#{zip}.json")
  @location = response.parsed_response["location"]["city"]
  @temp = response.parsed_response["current_observation"]["temp_f"].to_i
  @weather = response.parsed_response["current_observation"]["weather"].downcase
  @top = Outfit.where("range_start < #{@temp} AND range_end > #{@temp} AND #{@user.style} = true AND top = true AND outerwear = false").sample
  @bottom = Outfit.where("range_start < #{@temp} AND range_end > #{@temp} AND #{@user.style} = true AND bottom = true").sample
  if @temp < 70
    @outerwear = Outfit.where("range_start < #{@temp} AND range_end > #{@temp} AND #{@user.style} = true AND top = true AND outerwear = true").sample
  end
  @shoe = Outfit.where("range_start < #{@temp} AND range_end > #{@temp} AND #{@user.style} = true AND shoe = true").sample
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


delete '/sessions/id' do
  session.clear
  redirect '/'
end

post '/users' do
  @user = User.new(params)
  p params
  if @user.save
    session[:id] = @user.id
  end
  redirect '/sessions/new'
end

put '/users/:id' do
  user = User.find(params[:id])
  user.update(zip_code: params[:zipcode])
  user.save
  redirect "/sessions/new"
end

get '/outfit' do
  content_type :json
  zip = params[:code]

  response = HTTParty.get("https://api.wunderground.com/api/#{ENV['SECRET_KEY']}/geolookup/conditions/q/#{zip}.json")
  response.to_json
end



