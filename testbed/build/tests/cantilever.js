/*
* Copyright (c) 2006-2012 Erin Catto http://www.box2d.org
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/
System.register(["@box2d", "../testbed.js"], function (exports_1, context_1) {
    "use strict";
    var b2, testbed, Cantilever;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (b2_1) {
                b2 = b2_1;
            },
            function (testbed_1) {
                testbed = testbed_1;
            }
        ],
        execute: function () {
            Cantilever = class Cantilever extends testbed.Test {
                constructor() {
                    super();
                    let ground = null;
                    {
                        const bd = new b2.BodyDef();
                        ground = this.m_world.CreateBody(bd);
                        const shape = new b2.EdgeShape();
                        shape.SetTwoSided(new b2.Vec2(-40.0, 0.0), new b2.Vec2(40.0, 0.0));
                        ground.CreateFixture(shape, 0.0);
                    }
                    {
                        const shape = new b2.PolygonShape();
                        shape.SetAsBox(0.5, 0.125);
                        const fd = new b2.FixtureDef();
                        fd.shape = shape;
                        fd.density = 20.0;
                        const jd = new b2.WeldJointDef();
                        let prevBody = ground;
                        for (let i = 0; i < Cantilever.e_count; ++i) {
                            const bd = new b2.BodyDef();
                            bd.type = b2.BodyType.b2_dynamicBody;
                            bd.position.Set(-14.5 + 1.0 * i, 5.0);
                            const body = this.m_world.CreateBody(bd);
                            body.CreateFixture(fd);
                            const anchor = new b2.Vec2(-15.0 + 1.0 * i, 5.0);
                            jd.Initialize(prevBody, body, anchor);
                            this.m_world.CreateJoint(jd);
                            prevBody = body;
                        }
                    }
                    {
                        const shape = new b2.PolygonShape();
                        shape.SetAsBox(1.0, 0.125);
                        const fd = new b2.FixtureDef();
                        fd.shape = shape;
                        fd.density = 20.0;
                        const jd = new b2.WeldJointDef();
                        const frequencyHz = 5.0;
                        const dampingRatio = 0.7;
                        let prevBody = ground;
                        for (let i = 0; i < 3; ++i) {
                            const bd = new b2.BodyDef();
                            bd.type = b2.BodyType.b2_dynamicBody;
                            bd.position.Set(-14.0 + 2.0 * i, 15.0);
                            const body = this.m_world.CreateBody(bd);
                            body.CreateFixture(fd);
                            const anchor = new b2.Vec2(-15.0 + 2.0 * i, 15.0);
                            jd.Initialize(prevBody, body, anchor);
                            b2.AngularStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                            this.m_world.CreateJoint(jd);
                            prevBody = body;
                        }
                    }
                    {
                        const shape = new b2.PolygonShape();
                        shape.SetAsBox(0.5, 0.125);
                        const fd = new b2.FixtureDef();
                        fd.shape = shape;
                        fd.density = 20.0;
                        const jd = new b2.WeldJointDef();
                        let prevBody = ground;
                        for (let i = 0; i < Cantilever.e_count; ++i) {
                            const bd = new b2.BodyDef();
                            bd.type = b2.BodyType.b2_dynamicBody;
                            bd.position.Set(-4.5 + 1.0 * i, 15.0);
                            const body = this.m_world.CreateBody(bd);
                            body.CreateFixture(fd);
                            if (i > 0) {
                                const anchor = new b2.Vec2(-5.0 + 1.0 * i, 15.0);
                                jd.Initialize(prevBody, body, anchor);
                                this.m_world.CreateJoint(jd);
                            }
                            prevBody = body;
                        }
                    }
                    {
                        const shape = new b2.PolygonShape();
                        shape.SetAsBox(0.5, 0.125);
                        const fd = new b2.FixtureDef();
                        fd.shape = shape;
                        fd.density = 20.0;
                        const jd = new b2.WeldJointDef();
                        const frequencyHz = 8.0;
                        const dampingRatio = 0.7;
                        let prevBody = ground;
                        for (let i = 0; i < Cantilever.e_count; ++i) {
                            const bd = new b2.BodyDef();
                            bd.type = b2.BodyType.b2_dynamicBody;
                            bd.position.Set(5.5 + 1.0 * i, 10.0);
                            const body = this.m_world.CreateBody(bd);
                            body.CreateFixture(fd);
                            if (i > 0) {
                                const anchor = new b2.Vec2(5.0 + 1.0 * i, 10.0);
                                jd.Initialize(prevBody, body, anchor);
                                b2.AngularStiffness(jd, frequencyHz, dampingRatio, jd.bodyA, jd.bodyB);
                                this.m_world.CreateJoint(jd);
                            }
                            prevBody = body;
                        }
                    }
                    for (let i = 0; i < 2; ++i) {
                        const vertices = new Array();
                        vertices[0] = new b2.Vec2(-0.5, 0.0);
                        vertices[1] = new b2.Vec2(0.5, 0.0);
                        vertices[2] = new b2.Vec2(0.0, 1.5);
                        const shape = new b2.PolygonShape();
                        shape.Set(vertices);
                        const fd = new b2.FixtureDef();
                        fd.shape = shape;
                        fd.density = 1.0;
                        const bd = new b2.BodyDef();
                        bd.type = b2.BodyType.b2_dynamicBody;
                        bd.position.Set(-8.0 + 8.0 * i, 12.0);
                        const body = this.m_world.CreateBody(bd);
                        body.CreateFixture(fd);
                    }
                    for (let i = 0; i < 2; ++i) {
                        const shape = new b2.CircleShape();
                        shape.m_radius = 0.5;
                        const fd = new b2.FixtureDef();
                        fd.shape = shape;
                        fd.density = 1.0;
                        const bd = new b2.BodyDef();
                        bd.type = b2.BodyType.b2_dynamicBody;
                        bd.position.Set(-6.0 + 6.0 * i, 10.0);
                        const body = this.m_world.CreateBody(bd);
                        body.CreateFixture(fd);
                    }
                }
                Step(settings) {
                    super.Step(settings);
                }
                static Create() {
                    return new Cantilever();
                }
            };
            exports_1("Cantilever", Cantilever);
            Cantilever.e_count = 8;
        }
    };
});
//# sourceMappingURL=cantilever.js.map