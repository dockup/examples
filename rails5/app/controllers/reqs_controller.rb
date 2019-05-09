class ReqsController < ApplicationController
  def show
    render locals: { headers: headers }
  end
end
