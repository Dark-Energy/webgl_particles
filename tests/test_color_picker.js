function create_component(component, data)
{
  var Ctor = Vue.extend(component)
  var vm = new Ctor({ propsData: data }).$mount()
  current_component = vm;
  return vm;
}

function getRenderedText (component, data) {

  var vm = create_component(component, data);
  return vm.$el.textContent
}




var shit = getRenderedText(Color_Picker, {
    value : {r: 255, g: 255, b: 255}
});

console.log("REnder Color Picker", shit);

