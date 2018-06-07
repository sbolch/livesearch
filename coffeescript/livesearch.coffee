class App.Service.LiveSearch
  allowedKeys: null
  container: null
  lastValue: null
  lsCall: null
  timer: null
  typeDelay: null
  url: null

  ###
   @param url - url of the ajax backend service
   @param container - container for the response
   @param allowedKeys
  ###
  constructor: (url = null, container = null, allowedKeys = null)->
    @url = url
    @container = container
    @allowedKeys ?= [8, 32, 46] # [backspace, space, delete]
    @typeDelay = 200

  ###
   @param value - actual search value
   @param key - actual key pressed
   @param url - url of the ajax backend service
   @param container - container for the response
  ###
  search: (value, key = null, url = null, container = null)->

    if not key? or key >= 48 or key in @allowedKeys # key >= '0' or in @allowedKeys array
      if not @lastValue? or @lastValue != value
        @lsCall.abort() if @lsCall?     # cancel ongoing call
        clearTimeout(@timer) if @timer? # reset timer

        container ?= @container
        $(container).slideUp() if container?

        url ?= @url

        ls = @
        @timer = setTimeout(
          ->
            @lsCall = $.post(url, {q: value}, (response)->
              ls.lsCall = null  # close the call
              if container?
                $(container).html(response)
                $(container).slideDown() if response.length > 0
              ls.lastValue = value
              return response
            )
          @typeDelay
        )

  setUrl: (url)->
    @url = url
    return @
  getUrl: -> @url

  setContainer: (container)->
    @container = container
    return @
  getContainer: -> @container

  setAllowedKeys: (keys)->
    @allowedKeys = keys
    return @
  getAllowedKeys: -> @allowedKeys

  setTypeDelay: (delay)->
    @typeDelay = delay
    return @
  getTypeDelay: -> @typeDelay
