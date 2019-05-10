class ReqsController < ApplicationController
  def show
    render locals: { headers: request.env.to_h }
  end
end
