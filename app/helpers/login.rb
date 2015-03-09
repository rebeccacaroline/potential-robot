helpers do

  def logged_in?
    return true if session[:id] != nil
  end

end