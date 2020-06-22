
// import { Node, ESTree } from "../../Node";
// import { BaseClosure, } from '../../Closure'
// import { Messages } from '../../Message'
// import { Interpreter } from '../../../interpreter/main'
// import { createScope } from '../../Scope'
// import { Return } from '../../TokenClass'
// import { defineFunctionName } from '../../../util'

// export function classExpressionHandler(
//     this: Interpreter,
//     node:
//         | (ESTree.ClassExpression & { start?: number; end?: number })
//         | (ESTree.ClassDeclaration & { start?: number; end?: number })
// ): BaseClosure {
//     const self = this
//     const source = this.source;
//     const oldDeclVars = this.collectDeclVars;
//     const oldDeclFuncs = this.collectDeclFuncs;
//     const oldDeclLex = this.collectDeclLex;

//     // 准备新scope的声明提升变量，其实在class中不存在什么var变量的提升，这里只是置空一下
//     this.collectDeclVars = Object.create(null);
//     this.collectDeclFuncs = Object.create(null);
//     this.collectDeclLex = [];
//     const name = node.id ? node.id.name : ""; /**anonymous*/

//     let classDecl: {
//         constructor: BaseClosure
//         static: {
//             name: {
//                 computed: boolean
//                 value: BaseClosure
//             },
//             value: BaseClosure
//         },
//         // 放在实例this上的一些方法，这些方法是自绑定
//         fieldsMethod:
//     } = Object.create(null)
//     node.body.body.forEach(item=>{
//         if(item.type === 'MethodDefinition'){
//             // 关注3个属性：kind\static\computed
//             if(item.kind === 'constructor'){
//                 //
//             }
//         }else if(item.type === 'FieldDefinition'){

//         }else {
//             throw this.createInternalThrowError(Messages.NormalError, 'unknown class body type '+item.type, node.body)
//         }
//     })

//     // 这里是准备好的变量和函数声明提升
//     const declVars = this.collectDeclVars;
//     const declFuncs = this.collectDeclFuncs;
//     const declLex = this.collectDeclLex

//     this.collectDeclVars = oldDeclVars;
//     this.collectDeclFuncs = oldDeclFuncs;
//     this.collectDeclLex = oldDeclLex

//     // 创建一个新的scope，然后返回一个函数，该函数会在新建的scope执行
//     return () => {
//         // bind current scope
//         // 注意一个函数执行时候的作用域，并不是真正调用时候的作用域，而是声明时候代码所在地点的作用域
//         const runtimeScope = self.getCurrentScope();

//         const func = function (...args: any[]) {
//             // @ts-ignore
//             self.callStack.push(`${name}`);

//             // @ts-ignore
//             const prevScope = self.getCurrentScope();
//             // 函数执行时，创建新的scope，然后下一行将程序的运行指针指向新的scope
//             const currentScope = createScope(runtimeScope, `FunctionScope(${name})`);
//             currentScope.lexDeclared = lexDecls!
//             // @ts-ignore
//             self.setCurrentScope(currentScope);
//             // 将准备好的变量和函数声明赋值到新的scope
//             // @ts-ignore
//             self.addDeclarationsToScope(declVars, declFuncs, currentScope);

//             // var t = function(){ typeof t } // function
//             // t = function(){ typeof t } // function
//             // z = function tx(){ typeof tx } // function
//             // but
//             // d = { say: function(){ typeof say } } // undefined
//             if (name) {
//                 currentScope.data[name] = func;
//             }
//             // init arguments var
//             currentScope.data["arguments"] = arguments;

//             paramsGetter.forEach((getter, i) => {
//                 if(getter.type === 'RestElement'){
//                     currentScope.data[getter.closure()] = args.slice(i)
//                 }else{
//                     currentScope.data[getter.closure()] = args[i];
//                 }
//             });

//             // init this
//             // @ts-ignore
//             const prevContext = self.getCurrentContext();
//             //for ThisExpression
//             // @ts-ignore
//             self.setCurrentContext(this);

//             // 执行
//             const result = bodyClosure();

//             // 恢复
//             // @ts-ignore
//             self.setCurrentContext(prevContext);
//             // @ts-ignore
//             self.setCurrentScope(prevScope);
//             // @ts-ignore
//             self.callStack.pop();

//             if (result instanceof Return) {
//                 return result.value;
//             }
//         };

//         defineFunctionName(func, name);

//         Object.defineProperty(func, "length", {
//             value: paramLength,
//             writable: false,
//             enumerable: false,
//             configurable: true,
//         });

//         Object.defineProperty(func, "toString", {
//             value: () => {
//                 return source.slice(node.start, node.end);
//             },
//             writable: true,
//             configurable: true,
//             enumerable: false,
//         });
//         Object.defineProperty(func, "valueOf", {
//             value: () => {
//                 return source.slice(node.start, node.end);
//             },
//             writable: true,
//             configurable: true,
//             enumerable: false,
//         });

//         return func;
//     };
// }